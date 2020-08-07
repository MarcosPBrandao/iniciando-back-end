import { startOfHour, isBefore, getHours, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
//import CreateNotificationService from '@modules/notifications/services/'
import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepositories';

interface IRequest {
    provider_id: string;
    user_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) { }
    public async execute({ date, provider_id, user_id }: IRequest): Promise<Appointment> {

        const appointmentDate = startOfHour(date);
        //console.log('sim1 - ' + date);
        if (isBefore(appointmentDate, Date.now())) {
            throw new AppError("You can't create an appointment on a past date")
        }
        //console.log('sim2 - ' + date);
        if (user_id === provider_id) {
            console.log('You cant create appointment - ' + date);
            throw new AppError("You cant create an appointment with yourself");
        }
        //console.log('sim3 - ' + date);
        if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
            throw new AppError(
                "You can only create appointments between 8am and 5pm.")
        }
        //console.log('sim4 - ' + date);
        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
            provider_id
        );
        //console.log('sim5 - ' + date);
        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already bookend');
        }
        //console.log('sim6 - ' + date);
        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentDate
        });
        //console.log('sim7 - ' + date);
        // const createNotification = container.resolve(CreateNotificationService);
        const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");
        //console.log('sim8 - ' + dateFormatted);
        // await createNotification.execute({
        //     recipient_id: provider_id,
        //     content: `Novo agendamento para dia ${dateFormatted}`,
        // })

        // await this.cacheProvider.invalidate( verificar
        //     `provider-appointments:${provider_id}:${format(
        //         appointmentDate,
        //         'yyyy-M-d'
        //     )}`
        // );
        return appointment;
    }
}

export default CreateAppointmentService;
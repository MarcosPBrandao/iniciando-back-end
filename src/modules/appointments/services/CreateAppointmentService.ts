import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';



interface IRequest {
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('appointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) { }
    public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
        const AppointmentDate = startOfHour(date);

        const findAppointmentInStateDate = await this.appointmentsRepository.findByDate(
            AppointmentDate,
        );

        if (findAppointmentInStateDate) {
            throw new AppError('This appointment is already bookend');
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: AppointmentDate
        });

        return appointment;
    }
}

export default CreateAppointmentService;
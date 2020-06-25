import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({date, provider_id } : Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const AppointmentDate = startOfHour(date);

        const findAppointmentInStateDate = await appointmentsRepository.findByDate(
            AppointmentDate,
        );

        if (findAppointmentInStateDate) {
            throw Error('This appointment is already bookend');
        }
        
        const appointment = appointmentsRepository.create({
            provider_id,
            date: AppointmentDate
        });

        await appointmentsRepository.save(appointment);

        return appointment; 
   }
}

export default CreateAppointmentService;
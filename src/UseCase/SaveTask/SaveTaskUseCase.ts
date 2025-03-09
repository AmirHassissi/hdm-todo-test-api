import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    try {
      if (!dto.name || dto.name.trim() === '' || dto.name.trim() === 'Nouvelle Tâche') {
        throw new Error('Le nom de la tâche est requis.');
      }

      const task = await this.taskRepository.save({
        name: dto.name, 
        ...(dto.id && { id: dto.id }),
      });

      return task;  

    } catch (error) {
      throw new Error(`Erreur lors de la sauvegarde de la tâche : ${error.message}`);
    }
  }
}
import { NotFoundException } from '@nestjs/common';
import { getDate } from '../utils/algorithms';

export function errorNotFoundElement(classType?: string) {
    throw new NotFoundException(`No se ha encontrado el elemento ${classType}.`);
}

export function errorNotElements() {
    throw new NotFoundException('No se han encontrado elementos.');
}

export function errorLog(error: string) {
    const date = getDate(new Date());
    throw new NotFoundException(`[${date}] Error: ${error}.`);
}

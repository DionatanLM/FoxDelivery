import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryManDto } from './create-deliveryman.dto';

export class UpdateDeliveryManDto extends PartialType(CreateDeliveryManDto) {}

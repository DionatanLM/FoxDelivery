import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DeliverymanService } from './deliveryman.service';
import { CreateDeliveryManDto } from './dto/create-deliveryman.dto';

@Controller('deliveryman')
export class DeliveryManController {
  constructor(private readonly deliverymanService: DeliverymanService) {}

  @Post()
  create(@Body() createDeliveryManDto: CreateDeliveryManDto) {
    return this.deliverymanService.create(createDeliveryManDto);
  }

  @Get()
  findAll() {
    return this.deliverymanService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.deliverymanService.findOne(uuid);
  }

  @Get('/username/:username')
  findDeliveryByUsername(@Param('username') username: string) {
    return this.deliverymanService.findDeliveryByUsername(username);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.deliverymanService.remove(uuid);
  }
}

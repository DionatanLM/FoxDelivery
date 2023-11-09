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
import { UpdateAvailabilityDto } from './dto/update-availability.dto';

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

  @Patch('/availability/:uuid')
  updateAvailability(
    @Param('uuid') uuid: string,
    @Body() updateAvailabilityDto: UpdateAvailabilityDto,
  ) {
    return this.deliverymanService.updateAvailability(
      uuid,
      updateAvailabilityDto.isActive,
    );
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.deliverymanService.remove(uuid);
  }
}

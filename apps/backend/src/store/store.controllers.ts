import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  create(@Body() createDeliveryManDto: CreateStoreDto) {
    return this.storeService.create(createDeliveryManDto);
  }

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.storeService.findOne(uuid);
  }

  @Patch(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() updateDeliveryManDto: UpdateStoreDto,
  ) {
    return this.storeService.update(uuid, updateDeliveryManDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.storeService.remove(uuid);
  }
}

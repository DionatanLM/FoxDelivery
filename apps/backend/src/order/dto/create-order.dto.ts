import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { ORDER_STATUS } from 'src/config/constants/order-status.enum';
import { PAYMENTS_METHODS } from 'src/config/constants/payments_methods_enum';
import { Store } from 'src/entities/Store.entity';

export class CreateOrderDto {
  @IsNumber()
  @IsOptional()
  public orderNumber: number;

  @IsNumber()
  @IsNotEmpty()
  public price: number;

  @IsString()
  @IsOptional()
  public description: string;

  @IsString()
  @IsNotEmpty()
  public typePayment: string;

  @IsString()
  @IsNotEmpty()
  public address: string;

  @IsString()
  @IsNotEmpty()
  public latLngAddress: string;

  @IsString()
  @IsOptional()
  public status: ORDER_STATUS;

  @IsString()
  @IsOptional()
  public positionMotoboy: string;

  @IsDecimal()
  @IsOptional()
  public rating: string;

  @IsString()
  @IsOptional()
  public clientName: string;

  @IsString()
  @IsOptional()
  public clientCellphone: string;

  @IsString()
  @IsOptional()
  public deliverymanUuid: string;

  @IsString()
  @IsOptional()
  public storeUuid: string;
}

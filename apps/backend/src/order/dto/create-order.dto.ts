import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ORDER_STATUS } from 'src/config/constants/order-status.enum';

export class CreateOrderDto {
  @IsDecimal()
  @IsNotEmpty()
  public price: string;

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
}

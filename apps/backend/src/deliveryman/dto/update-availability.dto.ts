import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateAvailabilityDto {
  @IsBoolean()
  @IsNotEmpty()
  public isActive: boolean;
}

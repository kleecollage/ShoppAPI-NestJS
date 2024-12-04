import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from 'src/modules/client/client.module';
import { OrderModule } from 'src/modules/order/order.module';
import { ProductModule } from 'src/modules/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: 'localhost',
      port: 1521,
      username: 'shop',
      password: 'admin',
      connectString: 'localhost/XEPDB1',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProductModule,
    ClientModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

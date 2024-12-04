import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductDto } from 'src/modules/product/dto/product-dto';
import { StockDto } from 'src/modules/product/dto/stock-dto';
import { ProductService } from 'src/modules/product/product.service';

@Controller('api/v1/products')
@ApiTags('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @ApiOperation({
    description: 'Create a new product',
  })
  @ApiBody({
    description: 'Create a product through ProductDto',
    type: ProductDto,
    examples: {
      example1: {
        value: {
          id: 1,
          name: 'Product 1',
          price: 50,
          stock: 20,
          deleted: false,
        },
      },
      example2: {
        value: {
          name: 'Product 2',
          price: 75,
          stock: 30,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
  })
  @ApiResponse({
    status: 409,
    description: 'Product already exists',
  })
  createProduct(@Body() product: ProductDto) {
    return this.productService.createProduct(product);
  }

  @Get()
  @ApiOperation({
    description: 'Obtains all non deleted products',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the requested information',
  })
  getProducts() {
    return this.productService.findAll();
  }

  @Get('/deleted')
  @ApiOperation({
    description: 'Obtains all deleted products',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the requested information',
  })
  getProductsDeleted() {
    return this.productService.findAllDeleted();
  }

  @Get('/:id')
  @ApiOperation({
    description: 'Obtains one product trought his ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the requested information',
  })
  getProductById(@Param('id') id: number) {
    return this.productService.findProduct(id);
  }

  @Put()
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    required: true,
    type: Number,
  })
  @ApiOperation({
    description: 'Update one product',
  })
  @ApiBody({
    description:
      'Update one product through ProductDto, if product not exists, it is created',
    type: ProductDto,
    examples: {
      example1: {
        value: {
          id: 1,
          name: 'Product 1 updated or created',
          price: 500,
          stock: 200,
          deleted: false,
        },
      },
      example2: {
        value: {
          id: 2,
          name: 'Product 2 updated or created',
          price: 750,
          stock: 300,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Has been updated successfully',
  })
  updateProduct(@Body() product: ProductDto) {
    return this.productService.updateProduct(product);
  }

  @Delete('/:id')
  @ApiOperation({
    description:
      'Change product deleted status from false to true (softDelete)',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Product ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Has been deleted successfully',
  })
  @ApiResponse({
    status: 409,
    description: /* html */ `Product not exists. <br/>
      Product status is deleted: true.<br/>
    `,
  })
  deleteProduct(@Param('id') id: number) {
    return this.productService.softDelete(id);
  }

  @Patch('/restore/:id')
  @ApiOperation({
    description: 'Change product deleted status from true to false',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Product ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Selected product has been restored successfully',
  })
  @ApiResponse({
    status: 409,
    description: /* html */ `Product not exists. <br/>
      Product status is deleted: false.<br/>
    `,
  })
  restoreProduct(@Param('id') id: number) {
    return this.productService.restoreProduct(id);
  }

  @Patch('/stock')
  @ApiOperation({
    description: 'Update product stock',
  })
  @ApiBody({
    description: 'Update product stock through StockDto',
    type: StockDto,
    examples: {
      example1: {
        value: {
          id: 1,
          stock: 150,
        },
      },
      example2: {
        value: {
          id: 2,
          stock: 375,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Stock has been updated successfully',
  })
  @ApiResponse({
    status: 409,
    description: /* html */ `Product not exists. <br/>
      Product status is deleted: true.<br/>
    `,
  })
  updateStock(@Body() stock: StockDto) {
    return this.productService.updateStock(stock);
  }

  @Patch('/increment-stock')
  @ApiOperation({
    description: 'Increments product stock',
  })
  @ApiBody({
    description:
      'Increments product stock through StockDto.It is not possible to exceed one thousand in stoc',
    type: StockDto,
    examples: {
      example1: {
        value: {
          id: 1,
          stock: 250,
        },
      },
      example2: {
        value: {
          id: 2,
          stock: 750,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Stock has been incremented successfully',
  })
  @ApiResponse({
    status: 409,
    description: /* html */ `Product not exists. <br/>
      Product status is deleted: true.<br/>
    `,
  })
  incrementStock(@Body() stock: StockDto) {
    return this.productService.incrementStock(stock);
  }

  @Patch('/decrement-stock')
  @ApiOperation({
    description: 'Decrements product stock',
  })
  @ApiBody({
    description:
      'Decrements product stock through StockDto.It is not possible to have less than zero stock',
    type: StockDto,
    examples: {
      example1: {
        value: {
          id: 1,
          stock: 250,
        },
      },
      example2: {
        value: {
          id: 2,
          stock: 750,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Stock has been decremented successfully',
  })
  @ApiResponse({
    status: 409,
    description: /* html */ `Product not exists. <br/>
      Product status is deleted: true.<br/>
    `,
  })
  decrementStock(@Body() stock: StockDto) {
    return this.productService.decrementStock(stock);
  }
}

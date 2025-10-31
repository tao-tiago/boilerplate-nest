import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common"

import { QueryCompanyId, QueryId } from "@/core/shared/helpers/query-options.dto"
import { filters } from "@/core/shared/utils/filters"
import { CreateProductDTO } from "@/services/product/createProduct/createProduct.dto"
import { CreateProductService } from "@/services/product/createProduct/createProduct.service"
import { DeleteProductService } from "@/services/product/deleteProduct/deleteProduct.service"
import { ListProductDTO, ListProductFilter } from "@/services/product/listProduct/listProduct.dto"
import { ListProductService } from "@/services/product/listProduct/listProduct.service"
import { ShowProductService } from "@/services/product/showProduct/showProduct.service"
import { UpdateProductDTO } from "@/services/product/updateProduct/updateProduct.dto"
import { UpdateProductService } from "@/services/product/updateProduct/updateProduct.service"

@Controller("api/v1/companies")
export class ProductController {
  constructor(
    private listProductService: ListProductService,
    private createProductService: CreateProductService,
    private showProductService: ShowProductService,
    private updateProductService: UpdateProductService,
    private deleteProductService: DeleteProductService
  ) {}

  @Get(":companyId/products")
  async listProducts(@Param() param: QueryCompanyId, @Query() query: ListProductDTO) {
    const payload = filters<ListProductFilter>(query)

    return await this.listProductService.execute({ ...param, ...payload })
  }

  @Post(":companyId/products")
  async createProduct(@Param() param: QueryCompanyId, @Body() body: CreateProductDTO) {
    await this.createProductService.execute({ ...param, ...body })

    return {
      message: ["Product created successfully"]
    }
  }

  @Get("products/:id")
  async showProduct(@Param() param: QueryId) {
    return await this.showProductService.execute(param)
  }

  @Put("products/:id")
  async updateProduct(@Param() param: QueryId, @Body() body: UpdateProductDTO) {
    await this.updateProductService.execute({ ...param, ...body })

    return {
      message: ["Product updated successfully"]
    }
  }

  @Delete("products/:id")
  async deleteProduct(@Param() param: QueryId) {
    await this.deleteProductService.execute(param)

    return {
      message: ["Product deleted successfully"]
    }
  }
}

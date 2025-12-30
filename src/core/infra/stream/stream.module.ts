import { Module } from "@nestjs/common"

import { StreamProducer } from "./stream.producer"
import { StreamService } from "./stream.service"

@Module({
  providers: [StreamService, StreamProducer],
  exports: [StreamService, StreamProducer]
})
export class StreamModule {}

import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  type HealthCheckResult,
} from '@nestjs/terminus';

/**
 * Liveness / readiness probe.
 *
 * A deploy platform (or a human) can ask this one endpoint whether the
 * service is healthy. Heap is capped here because an unbounded in-memory
 * store is exactly the kind of thing that silently takes a service down.
 */
@ApiTags('health')
// VERSION_NEUTRAL keeps this at /health rather than /v1/health. Without it,
// URI versioning still rewrites the route even though the path is excluded
// from the global prefix — and a probe pointed at /health gets a 404.
@Controller({ path: 'health', version: VERSION_NEUTRAL })
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({
    summary: 'Health check',
    description:
      'Returns 200 when healthy, 503 when a check fails. Suitable for load-balancer and uptime probes.',
  })
  @ApiOkResponse({ description: 'Service is healthy.' })
  check(): Promise<HealthCheckResult> {
    return this.health.check([
      // 512 MB RSS ceiling — well above steady state, low enough to catch a leak.
      () => this.memory.checkRSS('memory_rss', 512 * 1024 * 1024),
      () => this.memory.checkHeap('memory_heap', 384 * 1024 * 1024),
    ]);
  }
}

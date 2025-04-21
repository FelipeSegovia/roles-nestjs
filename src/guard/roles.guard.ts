import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEYS } from 'src/decoratos/roles.decorator';
import { User } from 'src/feature/user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  /**
   * Reflector es un servicio de NestJS que permite acceder a los metadatos de las rutas.
   * En este caso, se utiliza para obtener los roles requeridos para acceder a una ruta específica.
   * @param reflector - Reflector
   * @description
   * El constructor inyecta el servicio Reflector para que pueda ser utilizado en el método canActivate.
   * El método canActivate se encarga de verificar si el usuario tiene los roles necesarios para acceder a la ruta.
   * Si el usuario tiene los roles necesarios, se permite el acceso a la ruta; de lo contrario, se deniega.
   * @returns boolean | Promise<boolean> | Observable<boolean>
   *
   * Los metadatos se definen en el decorador @Roles() que se aplica a los controladores o métodos de los controladores.
   * La definición de metadatos en NestJS se realiza utilizando el decorador @SetMetadata() que permite agregar información adicional a las rutas.
   *
   */
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    /**
     * context.getHandler() obtiene el controlador que maneja la solicitud actual.
     * context.getClass() obtiene la clase del controlador que maneja la solicitud actual.
     */
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEYS,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    /**
     * context.switchToHttp() obtiene el contexto HTTP de la solicitud actual.
     * getRequest() obtiene la solicitud HTTP actual.
     */
    const { user }: { user: User } = context.switchToHttp().getRequest();

    if (!user || !user.roles) {
      return false;
    }

    return user.roles.some((role) => requiredRoles.includes(role.name));
  }
}

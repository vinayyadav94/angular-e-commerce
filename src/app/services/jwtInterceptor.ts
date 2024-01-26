import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, switchMap, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()

export class JwtInterceptor implements HttpInterceptor{

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('jwt interceptor works.')
        
        // get the jwt token
        return this.authService.getLoggedInData().pipe(
            take(1), //will complete the observable and will tear down the action until the next action is dispatched
            switchMap((value) => {
                //add token to header
                if(value.login) {
                    req = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${value.jwtToken}`,
                        },
                    });
                }
                return next.handle(req);
            })
        );
        }
}
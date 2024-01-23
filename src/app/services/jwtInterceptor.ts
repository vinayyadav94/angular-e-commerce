import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, switchMap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()

export class JwtInterceptor implements HttpInterceptor{

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('jwt interceptor works.')
        let isLoggedIn = false;
        let jwtToken = '';
       // get the jwt token
        this.authService.getLoggedInData().subscribe(data=>{
            isLoggedIn = data.login;
            jwtToken = data.jwtToken;
        });
        //write logic to add jwt token.
        if(isLoggedIn) {
                        req = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${jwtToken}`,
                            },
                        });
                    }
        return next.handle(req);
    }

}
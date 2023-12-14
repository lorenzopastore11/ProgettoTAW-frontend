import { Injectable } from "@angular/core";
import { AccountService } from "./account.service";
import { environment } from "src/environment/environment";
import {Socket, io} from "socket.io-client";
import { BehaviorSubject, Observable, Subject } from "rxjs";


@Injectable({ providedIn: 'root' })
export class SocketService {
    public socket!: Socket;
       

    constructor(private accountService : AccountService) {
        
    }

    public pippo(mes:string) {
        this.socket = io(environment.apiUrl);
        return new Observable((observer) => {
            this.socket.on('connection', (mes) => {
                observer.next(mes);
            })
        })
        

            

            //console.log('ricevuto connect', data); // x8WIv7-mJelg7on_ALbx
      };
    }

    /*public pluto() {
        this.socket = io(environment.apiUrl);
        this.socket.on('nuovo-piatto-aggiunto', (message) => {
            console.log("update fatta coi socket ", message); // x8WIv7-mJelg7on_ALbx
      });

    }*/


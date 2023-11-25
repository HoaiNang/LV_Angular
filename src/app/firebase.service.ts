import { Injectable } from '@angular/core';
import { FirestoreModule } from '@angular/fire/firestore';
import { Observable, finalize } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: FirestoreModule) {}
}

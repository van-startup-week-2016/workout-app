import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { storageType, observableContainer } from '../../types';


@Injectable()
export class GlobalStateService {

  // The 3 storage types.
  private localStorage: Storage;
  private sessionStorage: Storage;
  private inMemoryStorage: Storage;

  // The 3 observables containers (one for each storage type).
  private sessionStorageObservables: observableContainer;
  private localStorageObservables: observableContainer;
  private inMemoryStorageObservables: observableContainer;

  constructor() {
    this.localStorage = localStorage;
    this.sessionStorage = sessionStorage;
    this.inMemoryStorage = new InMemoryStorage();
    this.localStorageObservables = {};
    this.sessionStorageObservables = {};
    this.inMemoryStorageObservables = {};
  }

  /**
   * Helper for getting the `storageType` storage.
   */
  private getStorage(storageChoice: storageType): Storage {
    switch(storageChoice) {
      case storageType.LocalStorage:
        return this.localStorage;
      case storageType.SessionStorage:
        return this.sessionStorage;
      case storageType.InMemoryStorage:
        return this.inMemoryStorage;
    }
  }

  /**
   * Helper for getting the `storageType` observable container.
   */
  private getObservableContainer(storageChoice: storageType): observableContainer {
    switch(storageChoice) {
      case storageType.LocalStorage:
        return this.inMemoryStorageObservables;
      case storageType.SessionStorage:
        return this.sessionStorageObservables;
      case storageType.InMemoryStorage:
        return this.inMemoryStorageObservables;
    }
  }

  /**
   * Helper for checking if a key has a value yet.
   *
   * @return True if an item has been placed in that `storageType`.
   */
  public has(key: string, storageChoice: storageType): boolean {
    const storage = this.getStorage(storageChoice);
    return storage.getItem(key) != null;
  }

  /**
   * Read (and `parse`) a value in storage.
   *
   * @param key The key for the value of interest.
   * @param storageChoice Which storage to look in.
   * @return The item in that storage, or `null` if no item exists.
   */
  public read(key: string, storageChoice: storageType): any {
    const storage = this.getStorage(storageChoice);
    return JSON.parse(storage.getItem(key));
  }

  /**
   * Removes a key-value pair from storage.
   */
  public remove(key: string, storageChoice: storageType): void {
    const storage = this.getStorage(storageChoice);
    storage.removeItem(key);
  }

  /**
   * Update the global state. Will alert everyone observing.
   *
   * Internally it will `stringify` and then `parse` the `value`.
   *
   * @param hash A hash containing all the key-value pairs to put in storage.
   * @param storageChoice The storage to use.
   */
  public write(hash: Object, storageChoice: storageType) {
    const storage = this.getStorage(storageChoice);
    const observableContainer = this.getObservableContainer(storageChoice);

    // Write a single key-value pair to the db.
    const writeSingle = (key: string, value: any) => {
      value = JSON.stringify(value);

      if(observableContainer[key] == undefined) {
        observableContainer[key] = new Subject<any>();
      }

      storage.setItem(key, value);
      observableContainer[key].next(JSON.parse(value));
    }

    for(let key in hash) {
      writeSingle(key, hash[key]);
    }
  }

  /**
   * Observe an aspect of the global state.
   */
  public observe(key: string, storageChoice: storageType
      , onChangeCallback: (value: any) => void): void {
    const observableContainer = this.getObservableContainer(storageChoice);

    if(observableContainer[key] == undefined) {
      observableContainer[key] = new Subject<any>();
    }

    observableContainer[key].subscribe(onChangeCallback);
  }
}

/**
 * Having the in-memory storage implement the same API makes the code simpler.
 */
class InMemoryStorage implements Storage {
  // To prevent typescript errors, can not be implemented with a class...
  [key: string]: any;
  [index: number]: string;

  private memory = {};
  public length = 0;

  clear(): void {
    this.memory = {};
  }

  getItem(key: string): any {
    return ((this.memory[key] == undefined) ? null : this.memory[key]);
  }

  key(index: number): string {
    if(index < 0 || index >= length) {
      return null;
    }

    return Object.keys(this.memory)[index];
  }

  removeItem(key: string): void {
    delete this.memory[key];
  }

  setItem(key: string, value: any): void {
    this.memory[key] = value;
  }
}
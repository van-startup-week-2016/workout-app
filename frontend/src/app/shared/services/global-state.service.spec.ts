/* tslint:disable:no-unused-variable */
///<reference path="../../../typings.d.ts" />

import { addProviders, async, inject } from '@angular/core/testing';

import { GlobalStateService } from './global-state.service';
import { storageType } from '../../types';


describe('Service: GlobalState', () => {
  beforeEach(() => {
    addProviders([GlobalStateService]);
  });

  it('should allow you to read and write a single value',
    inject([GlobalStateService],
      (globalStateService: GlobalStateService) => {
        globalStateService.write({ bla: "asdf" }, storageType.InMemoryStorage);
        expect(globalStateService.read("bla", storageType.InMemoryStorage)).toBe("asdf");
      }
    )
  );

  it('should allow you to use "has" to check if a value exists',
    inject([GlobalStateService],
      (globalStateService: GlobalStateService) => {
        globalStateService.write({ bla: "asdf" }, storageType.InMemoryStorage);
        expect(globalStateService.has("bla", storageType.InMemoryStorage)).toBeTruthy();
        expect(globalStateService.has("randomKey", storageType.InMemoryStorage)).toBeFalsy();
      }
    )
  );

  it('should allow you to read and write multiple values',
    inject([GlobalStateService],
      (globalStateService: GlobalStateService) => {
        globalStateService.write({
          bla: "bla",
          blooo: "bloop"
        }, storageType.InMemoryStorage);

        expect(globalStateService.read("bla", storageType.InMemoryStorage)).toBe("bla");
        expect(globalStateService.read("blooo", storageType.InMemoryStorage)).toBe("bloop");
      }
    )
  );

  it('should allow you to put objects directly in storage',
    inject([GlobalStateService],
      (globalStateService: GlobalStateService) => {
        const user = {email: "bla", password: "bloop"};
        globalStateService.write({ user }, storageType.InMemoryStorage);
        expect(globalStateService.read("user", storageType.InMemoryStorage)).toEqual(user);
      }
    )
  );

  it('should return null if reading for a key that has not been placed in storage',
    inject([GlobalStateService],
      (globalStateService: GlobalStateService) => {
        expect(globalStateService.read("bla", storageType.InMemoryStorage)).toBeNull();
      }
    )
  );

  it('should only put values in the selected storageType',
    inject([GlobalStateService],
      (globalStateService: GlobalStateService) => {
        globalStateService.write({ bla: "bla" }, storageType.InMemoryStorage);

        expect(globalStateService.read("bla", storageType.LocalStorage)).toBeNull();
        expect(globalStateService.read("bla", storageType.SessionStorage)).toBeNull();
      }
    )
  );

  it('should allow you to remove values from storage',
    inject([GlobalStateService],
      (globalStateService: GlobalStateService) => {
        globalStateService.write({ bla: "bla" }, storageType.InMemoryStorage);
        expect(globalStateService.read("bla", storageType.InMemoryStorage)).toBe("bla");

        globalStateService.remove("bla", storageType.InMemoryStorage);
        expect(globalStateService.read("bla", storageType.InMemoryStorage)).toBeNull();
      }
    )
  );

  it('should allow you to observe for a change', function(done) {
    inject([GlobalStateService], (globalStateService: GlobalStateService) => {
      globalStateService.observe("user", storageType.InMemoryStorage, (user: string) => {
        expect(user).toBe("bla");
        done();
      });

      globalStateService.write({ user: "bla"}, storageType.InMemoryStorage);
    })();
  });

  it('should allow you to observe for multiple changes', function(done) {
    inject([GlobalStateService], (globalStateService: GlobalStateService) => {
      let numberOfCalls = 0;
      globalStateService.observe("user", storageType.InMemoryStorage, (user: string) => {
        numberOfCalls++;

        if(numberOfCalls == 3) {
          expect(user).toBe("final");
          done();
        }
      });

      globalStateService.write({ user: "bla"}, storageType.InMemoryStorage);
      globalStateService.write({ user: "blooop"}, storageType.InMemoryStorage);
      globalStateService.write({ user: "final"}, storageType.InMemoryStorage);
    })();
  });
});

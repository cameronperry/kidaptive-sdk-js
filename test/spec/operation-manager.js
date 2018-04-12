'use strict';
import Error from '../../src/error';
import OperationManager from '../../src/operation-manager';
import Should from 'should';

describe('KidaptiveSdk Operation Manager Unit Tests',  () => {
  it('Queue Should Resolve', () => {
    const result = {a: "value1"};
    return Should(OperationManager.addToQueue(() => {
      return result;
    })).resolvedWith(result);
  });
  it('Queue With Error Should Reject', () => {
    const error = new Error(Error.ERROR_CODES.GENERIC_ERROR, 'Error within operation');
    return Should(OperationManager.addToQueue(() =>  {
      throw error;
    })).rejectedWith(error);
  });
  it('Queue Should Recover', () =>  {
    const result = {b: "value2"};
    return Should(OperationManager.addToQueue(() =>  {
      return result;
    })).resolvedWith(result);
  });
  it('Queue Should Resolve Inner Promise', () => {
    const result = {a: "value1"};
    const innerPromise = OperationManager.addToQueue(() => {
      return result;
    });
    return Should(OperationManager.addToQueue(() => {
      return innerPromise;
    })).resolvedWith(result);
  });
  it('Queue Should Reject Inner Promise', () => {
    const error = new Error(Error.ERROR_CODES.GENERIC_ERROR, 'Error within operation');
    const innerPromise = OperationManager.addToQueue(() => {
      throw error;
    });
    return Should(OperationManager.addToQueue(() => {
      return innerPromise;
    })).rejectedWith(error);
  });
  it('Queue Sequential Calls',  () =>  {
    const testVar = [];
    OperationManager.addToQueue(() =>  {
      testVar.push(1);
    });
    OperationManager.addToQueue(() =>  {
      testVar.push(2);
    });
    return OperationManager.addToQueue(() =>  {
      testVar.push(3);
      Should(testVar).deepEqual([1, 2, 3]);
    });
  });
  it('Queue Sequential Calls With Inner Calls', done =>  {
    const testVar = [];
    OperationManager.addToQueue(() => {
      testVar.push(1);
      OperationManager.addToQueue(() => {
        testVar.push(3);
        Should(testVar).deepEqual([1, 2, 3]);
      }).then(done).catch(done);
    });
    OperationManager.addToQueue(() => {
      testVar.push(2);
    });
  });
  it('Queue Complex Chaining', () => {
    const testVar = [];
    return OperationManager.addToQueue(() => {
      testVar.push(1);
      OperationManager.addToQueue(() => {
        testVar.push(2);
      })
    }).then(() => {
      return OperationManager.addToQueue(() => {
        testVar.push(3);
        Should(testVar).deepEqual([1, 2, 3]);
      });
    });
  });
});
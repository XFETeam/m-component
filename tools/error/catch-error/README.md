# @xfe-team/catch-error

> 通过装饰器或包裹的形式捕获异常, forked from [catch-decorator](https://github.com/enkot/catch-decorator.git)

## 安装

```bash
yarn add @xfe-team/catch-error
```

## 使用

以前的形式: 

```js
class Messenger {
    async getMessages() {
        try
            await api.getData() // <-- can throw ServerError
        } catch(err) {
            ...
        }   
    }
}
```

通过当前工具我们可以这样:

```js
import catchError from '@xfe-team/catch-error';

class Messenger {
    @catchError(ServerError, handler)
    async getMessages() {
        await api.getData() // <-- can throw custom ServerError
    }
}
```

我们可以捕获所有的 Error 异常:

```typescript
import catchError from '@xfe-team/catch-error';

class Messenger {
    @catchError(Error, (err: any) => console.log(err.message))
    getMessages() {
        throw new TypeError('ReferenceError here!');
        ...
    }
}
```

由于部分不标准的第三方库可能直接 `throw 'invalid type'` 抛出非 Error 类型的错误, 我们可以用 `*` 捕获异常:

```typescript
import catchError from '@xfe-team/catch-error';

class Messenger {
    @catchError('*', (err: any) => {/* 处理相关异常 */})
    getMessages() {
        throw new TypeError('ReferenceError here!');
        ...
    }
}
```

有一些情况下我们希望容错, 吃掉所有异常, 不让异常向上抛:
import catchError from '@xfe-team/catch-error';

```javascript
class Messenger {
    @catchError('*')
    getMessages() {
        throw new ReferenceError('ReferenceError here!')
        ...
    }
}
```

我们还可以通过这样形式分别处理不同类型的异常:

```js
import catchError from '@xfe-team/catch-error';

class Messenger {
    @catchError(TypeError, (err, ctx) => {...})
    @catchError(ReferenceError, (err, ctx) => {...})
    getMessages() {
        throw new ReferenceError('ReferenceError here!')
        ...
    }
}
```

也能够支持异步场景:
```js
class Messenger {
    errorMessage = null

    @catchError(ServerError, (err, ctx) => ctx.errorMessage = err.message)
    getMessages() {
        return fetch(myRequest).then(response => { // can throw ServerError
            ...
        })
    }
}
```

为了代码整洁, 我们不希望使用匿名函数:
```js
class Messenger {
    onServerError(error) {
       /* 在这里处理异常 */
    }

    @catchError(ServerError, 'onServerError')
    getMessages() {
        return fetch(myRequest).then(response => { // can throw ServerError
            ...
        })
    }
}
```

```js
class Messenger {
    onServerError(error) {
       /* 在这里处理异常 */
    }

    @catchError(ServerError, (err, ctx)=> ctx.onServerError(error))
    getMessages() {
        return fetch(myRequest).then(response => { // can throw ServerError
            ...
        })
    }
}
```

## 作者
She Ailun <br />
[enkot](https://github.com/enkot) (原作者)

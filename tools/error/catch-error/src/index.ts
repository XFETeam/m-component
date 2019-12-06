type HandlerFunction = (error: any, ctx: any) => void;

function handleError(
    ctx: any,
    errorClass: any,
    handler: HandlerFunction | string,
    error: any
) {
    let isMatch: boolean;
    if (typeof error === 'function') {
        isMatch = error();
    } else if (error === '*') {
        isMatch = true;
    } else {
        isMatch = error instanceof errorClass;
    }

    if (isMatch) {
        const handlerType = typeof handler;
        if (handlerType === 'function') {
            return (handler as HandlerFunction).call(ctx, error, ctx);
        } else if (handlerType === 'string') {
            return ctx[handler as string](error);
        } else {
            return;
        }
    }
    throw error;
}

// decorator factory function
export default (errorClass: any, handler: HandlerFunction): any => {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) => {
        // save a reference to the original method
        const originalMethod = descriptor.value

        // rewrite original method with custom wrapper
        descriptor.value = function (...args: any[]) {
            try {
                const result = originalMethod.apply(this, args)

                // check if method is asynchronous
                if (result && typeof result.then === 'function' && typeof result.catch === 'function') {
                    // return promise
                    return result.catch((error: any) => {
                        handleError(this, errorClass, handler, error)
                    })
                }

                // return actual result
                return result
            } catch (error) {
                handleError(this, errorClass, handler, error)
            }
        };

        return descriptor
    }
}

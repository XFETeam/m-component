import createErrorClass from '../../utils/create-error-class';

/**
 * react unmount error
 * @type {{name, new(...[*]): CustomClass, constructor: *, __proto__, prototype: CustomClass}}
 */
const UnmountSetStateError = createErrorClass('UnmountSetStateError', undefined , 'component has been mounted. setState is not allowed afterwards');
export default UnmountSetStateError;

import * as mnubo from './mnubo';

var _mnubo = (<any>window).mnubo;

(<any>window).mnubo = mnubo;

/**
 * Calling noConflict will restore window.mnubo to its previous loading state
 * and return the mnubo module object.
 */
 (<any>mnubo).noConflict = function() {
     (<any>window).mnubo = _mnubo;
     return mnubo;
 };

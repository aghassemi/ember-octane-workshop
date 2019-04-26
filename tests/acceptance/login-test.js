import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import StubbedAuthService from '../test-helpers/auth-service';
import AuthService from 'shlack/services/auth';

module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:auth', StubbedAuthService);
  });

  test('starting logged out, then logging in', async function(assert) {
    /**
     * @type {AuthService}
     */
    const auth = this.owner.lookup('service:auth');
    auth._writeUserId(null);

    await visit('/login');
    assert.equal(currentURL(), '/login');

    await fillIn('select', '1');

    await click('form input[type="submit"]');

    assert.ok(currentURL().startsWith('/teams'));
  });

  test('already logged in', async function(assert) {
    /**
     * @type {AuthService}
     */
    const auth = this.owner.lookup('service:auth');
    auth._writeUserId('1');

    await visit('/login');

    assert.ok(currentURL().startsWith('/teams'));
  });
});

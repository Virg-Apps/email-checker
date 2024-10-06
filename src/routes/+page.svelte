<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import { mdiEmail } from "@mdi/js";
	import type { ActionResult } from "@sveltejs/kit";
	import { Icon } from "mdi-svelte-ts";
	import type { ActionData } from "./$types";

    export let form: ActionData;
    const { to, from, host, port, secure, subject, message, user, password, proxy } = $page.data;
    let hasProxy: boolean = proxy != null;
    let messageResult: string | null;

    function submit() {
        return async ({ result }: { result: ActionResult }) => {
            if (result.status == 200) {
                console.log(form);
                messageResult = 'Email sent';
            }
		};
    }
</script>

<h1>E-mail tester</h1>

<section>
    <form method="POST" use:enhance={submit}>
        <div id="email">
            <div>
                <label for="from" class="form-label">From *</label>
                <input name="from" id="from" class="form-control" type="string" required={true} value={from} maxlength={100}/>
            </div>
            <div>
                <label class="form-label" for="to">To *</label>
                <input name="to" id="to" class="form-control" type="email" required={true} value={to} maxlength={100}/>
            </div>
            <div>
                <label class="form-label" for="subject">Subject *</label>
                <input name="subject" id="subject" class="form-control" type="text" required={true} value={subject} maxlength={100}/>
            </div>
            <div>
                <label class="form-label" for="message">Message</label>
                <textarea id="message" class="form-control" name="message" required={false} value={message} maxlength={1000} rows={3}/>
            </div>
        </div>

        <div id="configuration">
            <div>
                <label class="form-label" for="host">Host *</label>
                <input class="form-control" name="host" id="host" type="text" required={true} maxlength={100} value={host}/>
            </div>
            <div>
                <label class="form-label" for="port">Port *</label>
                <input name="port" id="port" class="form-control" type="number" step={1} min={0} required={true} value={port}/>
            </div>
            <div class="form-check">
                <input name="secure" class="form-check-input" type="checkbox" id="secure" checked={secure}>
                <label class="form-check-label" for="secure">Secure</label>
            </div>
            <div>
                <label for="user" class="form-label">User</label>
                <input name="user" type="string" class="form-control" id="user" required={true} value={user}/>
            </div>
            <div>
                <label for="password" class="form-label">Password</label>
                <input name="password" type="password" class="form-control" id="password" required={true} value={password}/>
            </div>
            <div>
                <label class="form-label" for="proxy">Proxy {hasProxy ? " *" : ""}</label>
                <div class="input-group">
                    <div class="input-group-text">
                        <input class="form-check-input" type="checkbox" bind:checked={hasProxy}/>
                    </div>
                    <input type="text" class="form-control" required={true} disabled={!hasProxy} value={proxy} id="proxy" name="proxy">
                </div>
            </div>
        </div>

        <div class="actions">
            <button type="submit" class="btn btn-primary">
                <Icon path={mdiEmail}/>
                <span>Send</span>
            </button>
        </div>

        {#if messageResult != null}
            <div id="message" class="alert alert-success" role="alert">{messageResult}</div>
        {/if}
    </form>
</section>

<style>
    section {
        display: flex;
        justify-content: center;
    }

    form {
        width: 100%;
        display: grid;
        gap: 1rem;
        grid-template-columns: 1fr 1fr;
        max-width: 1200px;
    }

    #email {
        display: grid;
        gap: 1rem;
    }

    #configuration {
        display: grid;
        gap: 1rem;
    }

    #message, .actions {
        grid-column: 1 / 3;
        display: flex;
        justify-content: center;
    }
</style>

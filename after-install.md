# Panda for Hermes installed

Enable it if you did not install with `--enable`:

```bash
hermes plugins enable panda
```

Restart Hermes or the gateway after enabling.

In shared gateways, restrict `/panda` to trusted users with Hermes slash-command access controls; runtime mode is process-local.

Commands:

- `/panda [lite|full|ultra|off]`
- `/panda-review [target]`
- `/panda-audit [target]`
- `/panda-debt`
- `/panda-gain`
- `/panda-help`

Bundled skills are available as `panda:panda`, `panda:panda-review`, `panda:panda-audit`, `panda:panda-debt`, `panda:panda-gain`, and `panda:panda-help`.

#!/usr/bin/env bash

# primeng schedule component
cp third-party-fixes/primeng/components/schedule/* node_modules/primeng/components/schedule/

# primeng autocomplete component
# cp third-party-fixes/primeng/components/autocomplete/* node_modules/primeng/components/autocomplete/

# later import issue with webpack https://github.com/bunkat/later/issues/155
cp third-party-fixes/later/* node_modules/later/

echo "Patched third-party libraries.\n"

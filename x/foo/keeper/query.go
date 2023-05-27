package keeper

import (
	"updateKeplr/x/foo/types"
)

var _ types.QueryServer = Keeper{}

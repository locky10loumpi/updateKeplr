package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgFooMessage = "foo_message"

var _ sdk.Msg = &MsgFooMessage{}

func NewMsgFooMessage(creator string, coins string) *MsgFooMessage {
	return &MsgFooMessage{
		Creator: creator,
		Coins:   coins,
	}
}

func (msg *MsgFooMessage) Route() string {
	return RouterKey
}

func (msg *MsgFooMessage) Type() string {
	return TypeMsgFooMessage
}

func (msg *MsgFooMessage) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgFooMessage) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgFooMessage) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

import {Avatar, IconButton, ListItemAvatar, ListItem,
    ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {Delete, Edit, PinDrop} from "@material-ui/icons";
import React from "react";

const MyListItem = (props) => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    {props.itemIcon}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.primaryText} secondary="Jan 9, 2014" />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => props.editCallback(props.itemId)}>
                    <Edit />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => props.deleteCallback(props.itemId)}>
                    <Delete />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default MyListItem;
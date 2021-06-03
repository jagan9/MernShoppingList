import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems, delItem, addItem, updateItem } from '../Redux/Actions/GetItems';
import { IconButton, ListItem, ListItemText, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class Items extends Component {

    constructor(props) {
        super(props)

        this.state = {
            itemGot: false,
            name: "",
            name_error: null,
            modelOpen: false,
            updatename_error: null
        }
    }


    componentDidMount() {
        this.props.getItems();
        this.setState({
            itemGot: true,
        })
    }


    handleChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    deleteItem = (id) => {
        this.props.delItem(id);
    }

    handleClick = () => {

        let ValidData = true;

        if (this.state.name.length <= 2) {
            ValidData = false;
            this.state.name_error = "please enter valid item"
        }

        this.setState({ update: true });

        if (ValidData) {

            const item = {
                name: this.state.name,
            };
            this.props.addItem(item);
            this.setState({ name: "", name_error: null })
        }
    }


    updateAnItem = () => {
        this.state.updatename_error = null;

        const item = {
            name: this.state.update_name,
        };

        if (this.state.update_name.length <= 2) {
            this.state.updatename_error = "please enter valid item";
        }

        this.setState({ update: true });

        if (this.state.update_name.length > 2) {
            this.props.updateItem(this.state.id, item);
            this.setState({ modelOpen: false });
        }

    }


    render() {
        return (
            <div style={{ maxWidth: "90%", margin: "auto", paddingTop: "50px" }}>
                <TextField
                    error={this.state.name_error !== null}
                    helperText={this.state.name_error}
                    fullWidth
                    type="text"
                    value={this.state.name}
                    name="name"
                    onChange={(e) => this.handleChange(e)}
                    placeholder="enter item"
                    label="Enter item" /><br /><br />
                <Button
                    variant="contained"
                    color="primary"
                    disabled={this.state.button}
                    onClick={() => this.handleClick()}>Add Item</Button>
                <br /><br />
                {
                    this.state.itemGot &&
                    this.props.items.items.map(({ name, _id }) => {
                        return (
                            <div key={_id}>
                                <Paper elevation={2} style={{ padding: "0px" }} >
                                    <ListItem button key={_id}>
                                        <ListItemText primary={name}></ListItemText>
                                        <IconButton style={{
                                            backgroundColor: "green",
                                            color: "#fff"
                                        }} onClick={() => this.setState({ modelOpen: true, update_name: name, id: _id })} edge="end">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton style={{
                                            backgroundColor: "red",
                                            marginLeft: "18px",
                                            color: "#fff"
                                        }} onClick={() => this.deleteItem(_id)} edge="end">
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                </Paper>
                                <br />
                            </div>
                        )
                    })
                }
                <Dialog open={this.state.modelOpen} onClose={() => this.setState({ modelOpen: false })} aria-labelledby="form-dialog-title">
                    <DialogTitle>Update an Item</DialogTitle>
                    <DialogContent>
                        <TextField
                            error={this.state.updatename_error !== null}
                            helperText={this.state.updatename_error}
                            onChange={(e) => this.setState({ update_name: e.target.value })}
                            autoFocus
                            margin="dense"
                            value={this.state.update_name}
                            label="Update an item"
                            type="text"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({ modelOpen: false })} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.updateAnItem()} color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getItems: () => dispatch(getItems()),
        addItem: (item) => dispatch(addItem(item)),
        delItem: (id) => dispatch(delItem(id)),
        updateItem: (id, item) => dispatch(updateItem(id, item))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Items);

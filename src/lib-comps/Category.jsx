import {
    Button,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
    IconButton,
  } from "@material-ui/core";
  import { useEffect, useState } from "react";
  import { makeStyles } from "@material-ui/core/styles";
  import Container from "@material-ui/core/Container";
  import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
  import Dialog from "@material-ui/core/Dialog";
  import DialogActions from "@material-ui/core/DialogActions";
  import DialogTitle from "@material-ui/core/DialogTitle";
  
  const useStyles = makeStyles((theme) => ({
    para: {
      textTransform: "capitalize",
    },
  }));
  
  export default function BookList() {
    let [loading, setLoading] = useState(true);
    let [books, setBooks] = useState([]);
    let [bookData, setBookData] = useState([]);
  
    const classes = useStyles();
    const url = "http://localhost:3300/books";
    let getBooks = async () => {
      let token = JSON.parse(localStorage.getItem("token"))
      console.log(token)
      let response = await fetch(url,
        {
        headers:{
          "Authorization":"Bearer "+token
        }});
  
        if(response.status!==200){
          let data = await response.json();
        
            console.log(data.message)
            return
        }
  
      let data = await response.json();
      if(data.message===undefined)  setBooks(data);
      else setBooks([{title:data.message}])
      setLoading(false);
  
    };
    let deleteBook = async (id) => {
      let response = await fetch(url + "/" + id, {
        method: "DELETE",
      }).catch(err=>console.log(err));
  
      await getBooks();
    };
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    useEffect(() => {
      getBooks();
    }, []);
    return (
      <Container fixed maxWidth="xs" padding="40px" margin-top="40px">
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure that you want to delete " + bookData[1]}
          </DialogTitle>
  
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              No
            </Button>
            <Button
              onClick={() => {
                deleteBook(bookData[0]);
                handleClose();
              }}
              color="secondary"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Typography align="center" variant="h3">
          All Books
        </Typography>
        <hr />
        <Paper elevation={3}>
          {loading ? (
            <CircularProgress />
          ) : (
            <List>
              { books.map((book) => {
                return (
                  <ListItem>
                    <ListItemText
                      className={classes.para}
                      primary={book.title}
                      secondary={book.author?.join(", ")}
                    />
  
                    {books[0].title !== "No books to show" && (
                      <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => {
                          setBookData([book._id, book.title]);
                          handleClickOpen();
                        }}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    )}
                  </ListItem>
                );
              })}
            </List>
          )}
        </Paper>
      </Container>
    );
  }
  
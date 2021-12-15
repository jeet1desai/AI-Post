import {
  Autocomplete,
  Backdrop,
  CircularProgress,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import RowDialogBox from "../../components/Dialog";
import service from "../../services/post.service";
import { IPostFetchHitsData } from "../../utils/interfaces/post";

const Home: React.FC = () => {
  const currentPage = useRef(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [allPostData, setPostData] = useState<IPostFetchHitsData[]>([]);

  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [rowData, setRowData] = useState<IPostFetchHitsData>(
    {} as IPostFetchHitsData
  );

  useEffect(() => {
    if (currentPage.current === 0) {
      handleGetPostList();
    }
    let fetchData = setInterval(() => {
      if (search.length === 0) {
        handleGetPostList();
      }
    }, 10 * 1000);
    return () => {
      clearInterval(fetchData);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      search.length === 0
    ) {
      handleGetPostList();
    }
  };

  const handleGetPostList = async () => {
    const page: number = currentPage.current ? currentPage.current : 0;
    setLoading(true);
    try {
      const result = await service.getPostsData(page);
      const post: IPostFetchHitsData[] = result.data.hits;
      setPostData((existingPosts) => [
        ...existingPosts.filter(
          (item: IPostFetchHitsData) =>
            !post.some((i: IPostFetchHitsData) => i.objectID === item.objectID)
        ),
        ...post,
      ]);
      currentPage.current = result.data.page + 1;
    } catch (e) {}
    setLoading(false);
  };

  let filteredPosts: IPostFetchHitsData[] = [...allPostData];

  if (search.trim()) {
    filteredPosts = filteredPosts.filter(
      (item: IPostFetchHitsData) =>
        item.author?.toLowerCase().includes(search.trim().toLowerCase()) ||
        item.url?.toLowerCase().includes(search.trim().toLowerCase()) ||
        item.title?.toLowerCase().includes(search.trim().toLowerCase())
    );
  }

  if (selectedDate) {
    filteredPosts = filteredPosts.filter((item: IPostFetchHitsData) => {
      if (item.created_at) {
        const itemCreatedDate = new Date(item.created_at)
          .toISOString()
          .slice(0, 10);
        return selectedDate === itemCreatedDate;
      }
    });
  }

  if (title.trim()) {
    filteredPosts = filteredPosts.filter(
      (item) => item.title?.toLowerCase() === title.trim().toLowerCase()
    );
  }

  return (
    <div className="home-page">
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      <Container>
        <TextField
          fullWidth
          id="search-title-url-author"
          label="Search Post"
          variant="outlined"
          inputProps={{ 'data-testid': 'search' }}
          defaultValue={""}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <br />
        <br />
        <Grid container spacing={2}>
          <Grid item sx={{ width: "75%" }}>
            <Autocomplete
              freeSolo
              disableClearable
              id="filter-title"
              options={allPostData.map(
                (post: IPostFetchHitsData) => post.title
              )}
              value={title}
              onInputChange={(e, newValue) => {
                setTitle(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Title" />}
            />
          </Grid>
          <Grid item sx={{ width: "25%" }}>
            <TextField
              fullWidth
              type="date"
              id="search-title-url-author"
              label="Created At"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </Grid>
        </Grid>
        <br />
        <br />
        <TableContainer>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>URL</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPosts.map((post: IPostFetchHitsData) => (
                <TableRow
                  hover
                  key={post.objectID}
                  onClick={() => {
                    setRowData(post);
                    setDialogOpen(true);
                  }}
                >
                  <TableCell>{post.title}</TableCell>
                  <TableCell
                    style={{ maxWidth: "300px", overflowWrap: "break-word" }}
                  >
                    <a href={post.url}>{post.url}</a>
                  </TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.created_at}</TableCell>
                </TableRow>
              ))}
              {filteredPosts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4}>No Data Available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {isDialogOpen && (
        <RowDialogBox
          show={isDialogOpen}
          handleClose={() => setDialogOpen(false)}
          rowData={rowData}
        />
      )}
    </div>
  );
};

export default Home;

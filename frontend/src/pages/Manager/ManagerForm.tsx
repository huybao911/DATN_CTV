import { Container } from "@mui/material";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type Props = {
  post: any;
};
const ManagerForm: React.FC<Props> = ({ post }): JSX.Element => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const text = post?.poster.username ?? null;
  const letter = text.charAt(0).toUpperCase();

  const textcreatedAt = post?.createdAt ?? null;
  const lettercreatedAt = textcreatedAt.slice(0, 10);

  function formatDate(input: any) {
    var datePart = input.match(/\d+/g),
      year = datePart[0].substring(0),
      month = datePart[1], day = datePart[2];

    return day + '/' + month + '/' + year;
  }

  return (
    <Container component={Card} sx={{ paddingBottom: 10 }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {letter}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={post?.title ?? null}
          subheader={formatDate(lettercreatedAt)}
        />
        <CardMedia
          component="img"
          height="194"
          image={PF + post?.image ?? null}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post?.content ?? null}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
};
export default ManagerForm;

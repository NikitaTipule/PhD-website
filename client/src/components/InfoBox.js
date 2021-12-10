import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import "../CSS/infobox.css"

export default function MediaCard({count, tag}) {
  return (
    <Card className="card" sx={{
      backgroundColor: '#83eeff',
    }}>
      <CardContent sx={{
        paddingBottom: '0px'
      }}>
        <div className="head">
          {count}
        </div>
        <div className="subtitle">
          {tag}
        </div>
        <div className="check">
          Click here
        </div>
      </CardContent>
    </Card>
  );
}

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { format } from "date-fns";

import Avatar from "./Avatar";
import Rating from "./Rating";

const Container = styled.div`
  display: flex;
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 24px;
`;

const Content = styled.div`
  margin-left: 18px;
`;

const Timestamp = styled.p`
  font-family: Roboto;
  font-size: 11px;
  color: #aaa;
  margin-top: 4px;
  margin-bottom: 0px;
`;

const Text = styled.p`
  font-family: Roboto;
  font-size: 14px;
  margin-top: 16px;
  margin-bottom: 0px;
`;

const Review = ({ rating, time, text, reviewer, avatar }) => (
  <Container>
    <Avatar src={avatar} />
    <Content>
      <Rating value={rating} isDisabled />
      <Timestamp>
        by {reviewer}, {format(time, "DD MMMM YYYY, HH.mm a")}
      </Timestamp>
      <Text>{text}</Text>
    </Content>
  </Container>
);

Review.propTypes = {
  rating: PropTypes.number,
  time: PropTypes.string,
  text: PropTypes.string,
  reviewer: PropTypes.string,
  avatar: PropTypes.string
};

export default Review;

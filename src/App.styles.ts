import styled from "styled-components";
import {IconButton} from "@material-ui/core";


export const Wrapper = styled.div`
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto;
  gap: 1rem;
  margin: 40px auto;
`


export const StyledButton = styled(IconButton)`
  position: fixed;
  top: 20px;
  right: 100px;
  z-index: 100;
`

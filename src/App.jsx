
import './App.css'
import TodoList from "./components/TodoList";
import {Col, Row} from "antd";

function App() {

  return (
      <div name="hello" style={{width:"100%"}}>
          <Row>
              <Col span={12} offset={6}>
                  <TodoList/>
              </Col>
          </Row>
      </div>

  )
}

export default App

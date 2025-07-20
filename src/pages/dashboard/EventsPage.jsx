import { useEffect, useState } from "react";
import { Row, Col, Card, Typography, Spin, Empty } from "antd";
import { getAllPublicEvents } from "../../api/index";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const truncate = (str, n) => (str && str.length > n ? str.slice(0, n - 1) + "..." : str);

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const data = await getAllPublicEvents();
      setEvents(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        Events
      </Title>
      {loading ? (
        <Spin size="large" />
      ) : events.length === 0 ? (
        <Empty description="No events found" />
      ) : (
        <Row gutter={[24, 24]}>
          {events.map((event) => (
            <Col xs={24} sm={12} md={8} lg={6} key={event._id}>
              <Card
                hoverable
                onClick={() => navigate(`/events/${event._id}`)}
                cover={
                  event.photos && event.photos[0] ? (
                    <img
                      alt={event.heading}
                      src={event.photos[0].startsWith("http") ? event.photos[0] : `data:image/jpeg;base64,${event.photos[0]}`}
                      style={{ height: 180, objectFit: "cover" }}
                    />
                  ) : null
                }
                style={{ height: 350, display: "flex", flexDirection: "column", cursor: "pointer" }}
              >
                <Title level={4} style={{ marginBottom: 8 }}>
                  {event.heading}
                </Title>
                <Paragraph ellipsis={{ rows: 3, expandable: false }} style={{ marginBottom: 0 }}>
                  {truncate(event.description, 120)}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default EventsPage;
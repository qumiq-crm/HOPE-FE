import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Carousel, Card, Button, Spin, Empty } from "antd";
import { getEventDetailsApi } from "../../api/index";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

function EventsDetailsPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      const data = await getEventDetailsApi({ eventId });
      console.log(data)
      setEvent(data || null);
      setLoading(false);
    };
    fetchEvent();
  }, [eventId]);

  if (loading) return <Spin size="large" style={{ display: "block", margin: "40px auto" }} />;
  if (!event) return <Empty description="Event not found" />;

  return (
    <div style={{ maxWidth: 700, margin: "32px auto", padding: 24 }}>
      <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: 24 }}>
        Back
      </Button>
      <Card bordered={false} style={{ boxShadow: "0 2px 8px #f0f1f2" }}>
        {event.photos && event.photos.length > 0 && (
          <Carousel autoplay dots style={{ marginBottom: 24 }}>
            {event.photos.map((photo, idx) => {
              // Handle photo as an object with base64url property
              
              return (
                <div key={idx}>
                  <img
                    src={`data:image/jpeg;base64,${photo}`}
                    alt={`event-img-${idx}`}
                    style={{ width: "100%", maxHeight: 350, objectFit: "cover", borderRadius: 8 }}
                  />
                </div>
              );
            })}
          </Carousel>
        )}
        <Title level={2} style={{ marginBottom: 16 }}>{event.heading}</Title>
        <Paragraph style={{ fontSize: 16 }}>{event.description}</Paragraph>
      </Card>
    </div>
  );
}

export default EventsDetailsPage; 
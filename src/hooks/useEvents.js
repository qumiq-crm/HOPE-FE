import { useState, useEffect, useCallback } from "react";
import {
  createEventApi,
  getEventList,
  updateEventApi,
} from "../api/index";
import notify from "./useNotifyToast";

const useEvents = (filters) => {
  const [events, setEvents] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getEventList(filters);
      if (data) {
        setEvents(data?.events || []);
        setTotalCount(data?.totalCount || 0);
      }
    } catch (err) {
      notify("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const createEvent = async (eventData) => {
    setLoading(true);
    try {
      const data = await createEventApi(eventData);
      if (data) {
        fetchEvents();
        notify("Event created successfully!", "success");
      }
      return data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to create event";
      notify(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (id, eventData) => {
    setLoading(true);
    try {
      const data = await updateEventApi(id, eventData);
      if (data) {
        fetchEvents();
        notify("Event updated successfully!", "success");
      }
      return data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to update event";
      notify(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    totalCount,
    loading,
    refetch: fetchEvents,
    handleCreateEvent: createEvent,
    handleUpdateEvent: updateEvent,
  };
};

export default useEvents; 
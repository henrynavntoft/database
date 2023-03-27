fetch("https://ihjawproqviyqyssqucs.supabase.co/rest/v1/wines", {
  method: "get",
  headers: {
    apikey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloamF3cHJvcXZpeXF5c3NxdWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5MTkzMDksImV4cCI6MTk5NTQ5NTMwOX0.vmvIvYgK6rGjddur_LkY2znIXbG2OU58_GsXF0ZLGc8",
  },
})
  .then((e) => e.json())
  .then((e) => console.log(e));

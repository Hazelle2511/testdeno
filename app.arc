@app
begin-app

@http
get /
post /api/senddata


@tables
data
  scopeID *String
  dataID **String
  ttl TTL

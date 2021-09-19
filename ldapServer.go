
// Server for LDAP authentication
// Taken from Election portal project

package main
import (
  "fmt"
  "encoding/json"
  "log"
  "net/http"
  "github.com/go-ldap/ldap"
  "strings"
)
var l *ldap.Conn

type Request struct {
  Password string
  MIS string
}
type Response struct {
  MIS string
  Email string
}

func serve(w http.ResponseWriter, r *http.Request) {
  fmt.Println("Req received");
  var req Request
  if r.URL.Path != "/auth" {
    fmt.Println("Invalid Path");
    http.Error(w, "404 not found", http.StatusNotFound)
    return
  }

  switch r.Method {
  case "GET":
    fmt.Println("GET request not valid");
    fmt.Fprintf(w, "Sorry, only GET and POST methods are supported.")
  case "POST":
    if err := r.ParseForm(); err != nil {
      w.WriteHeader(http.StatusBadRequest)
      fmt.Fprintf(w, "ParseForm() error: %v", err)
      fmt.Println("Parsing err")
      return
    }

    /* Extract request body */
    err := json.NewDecoder(r.Body).Decode(&req)
    if err != nil {
      http.Error(w, err.Error(), http.StatusBadRequest)
      fmt.Println("json decoding err")
      return
    }

    fmt.Println("MIS: %s", req.MIS);
    MIS := req.MIS
    Password := req.Password
    baseDN := "dc=coep,dc=org,dc=in"
    filter := fmt.Sprintf("(cn=%s)", ldap.EscapeFilter(MIS))

    //fmt.Print("\nQuery from " + MIS + " : ")

    ldapURL := "ldap://10.1.101.41"
    l, err := ldap.DialURL(ldapURL)
    if err != nil {
      //fmt.Println("Error connecting to ldap")
      log.Fatal(err)
    } else {
      //fmt.Println("Connected to ldap")
    }

    /* Search for user */
    searchReq := ldap.NewSearchRequest(baseDN, ldap.ScopeWholeSubtree, 0, 0, 0, false, filter, []string{}, []ldap.Control{})
    result, err := l.Search(searchReq)
    if err != nil {
	//fmt.Print("User not found")
	w.WriteHeader(http.StatusUnauthorized)
	fmt.Fprintf(w, "Error: Error while searching user.")
	return
    }
    if len(result.Entries) == 0 {
	w.WriteHeader(http.StatusUnauthorized)
	fmt.Fprintf(w, "Error: Error while searching user.")
	return
    }

    /* Verify if username and password match. */
    DN := result.Entries[0].DN
    err = l.Bind(DN, Password)
    if err != nil {
	if strings.Contains(err.Error(), "49") {
	    //fmt.Print("Incorrect Credentials")
	    w.WriteHeader(http.StatusUnauthorized)
	    fmt.Fprintf(w, "Error: Incorrect Credentials")
	} else {
	    //fmt.Print("Unknown error")
	    w.WriteHeader(http.StatusServiceUnavailable)
	    fmt.Fprintf(w, "Error: Unknown. Please try again")
	}
	return
    }

    respData := Response{MIS:result.Entries[0].GetAttributeValue("uid"), Email:result.Entries[0].GetAttributeValue("mail")}
    //respData.mis = "result.uidNumber[0] "
    //respData.email = "result.mail[0]"

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusAccepted)
    json.NewEncoder(w).Encode(respData)
    //fmt.Println("Credentials Valid")
    //fmt.Fprint(w, "Credentials Vaild")
    defer l.Close()

  }
}

func main() {
  /* Connect to LDAP */
  /*
  ldapURL := "ldap://10.1.101.41"
  var err error
  l, err = ldap.DialURL(ldapURL)

  if err != nil {
    fmt.Println("Error connecting to ldap")
    log.Fatal(err)
  } else {
    fmt.Println("Connected to ldap")
  }
  */
  fmt.Println("Starting Server...")

  http.HandleFunc("/", serve)
/*
  http.handleFunc("/", go func(w, r) {
    serve(w, r)
  })
*/

  if err := http.ListenAndServe(":6000", nil); err != nil {
    log.Fatal(err)
  }
  //defer l.Close()
}

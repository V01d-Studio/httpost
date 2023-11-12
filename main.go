package main

import (
	"fmt"
	"log"
	"net/http"
)

func headers(w http.ResponseWriter, req *http.Request) {

    for name, headers := range req.Header {
        for _, h := range headers {
            fmt.Fprintf(w, "%v: %v\n", name, h)
        }
    }
}

func main() {
	fs := http.FileServer(http.Dir("./"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	http.Handle("/", http.FileServer(http.Dir("./")))

	err := http.ListenAndServe(":54321", nil)
	if err != nil {
		log.Fatal(err)
	}
}
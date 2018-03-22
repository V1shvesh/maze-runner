{
  "targets": [
    {
      "include_dirs" : [
        "<!(node -e \"require('nan')\")"
      ],
      "target_name": "backtrack",
      "sources": [ "./assets/backtracker.cc" ]
    }
  ]
}
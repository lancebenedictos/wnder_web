import React, { useContext, useMemo, useState } from "react";
import { MentionsInput, Mention } from "react-mentions";
import context from "../context/context";

const mentoinStyle = {
  control: {
    backgroundColor: "#fff",
    fontSize: 14,
    fontWeight: "normal",
  },

  "&multiLine": {
    control: {
      minHeight: 63,
    },
    highlighter: {
      padding: 9,
      border: "1px solid transparent",
    },
    input: {
      padding: 9,
      border: "1px solid silver",
      borderRadius: "0.5rem",
    },
  },

  suggestions: {
    list: {
      backgroundColor: "white",
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 14,
      borderRadius: "0.5rem",
    },
    item: {
      padding: "5px 15px",
      borderBottom: "1px solid rgba(0,0,0,0.15)",
      "&focused": {
        backgroundColor: "#cee4e5",
      },
    },
  },
};

type propTypes = {
  locationName?: string;
  updateLocationData: (data: {}) => void;
  reminders: [];
  startDate?: number;
  endDate?: number;
};

function LocationForm({
  locationName,
  reminders,
  startDate = Date.now(),
  endDate = Date.now(),
  updateLocationData,
}: propTypes) {
  const [mentionVal, setMentionVal] = useState("");
  const trip = useContext<any>(context);
  const users = trip?.users?.map((user: any) => {
    return {
      display: user.user.username,
      id: user.user._id,
    };
  });

  return (
    <div className="p-2 flex flex-col gap-2">
      <h2 className="text-xl">{locationName}</h2>
      <label htmlFor="startDate">Choose time and date start:</label>
      <input
        type="datetime-local"
        id="startDate"
        name="startDate"
        className="border-2 p-2 rounded-lg"
        onChange={(e) => {
          updateLocationData({
            startDate: e.currentTarget.value,
          });
        }}
      />
      <label htmlFor="endDate">Choose time and date to leave:</label>
      <input
        type="datetime-local"
        id="endDate"
        name="endDate"
        className="border-2 p-2 rounded-lg"
        onChange={(e) => {
          updateLocationData({
            endDate: e.currentTarget.value,
          });
        }}
      />

      <p>Reminders</p>
      <MentionsInput
        value={mentionVal}
        onChange={(e) => setMentionVal(e.target.value)}
        placeholder="Bring chairs @person"
        a11ySuggestionsListLabel="Suggested mentions"
        style={mentoinStyle}
        allowSuggestionsAboveCursor={true}
      >
        <Mention
          trigger="@"
          data={users}
          style={{ backgroundColor: "#f5f5f5" }}
          displayTransform={(id, display): string => {
            return `@${display}`;
          }}
          onAdd={(id, display: any) => {
            console.log(display);
          }}
        />
      </MentionsInput>
      <button
        className="px-3 py-2 text-white rounded-lg bg-green-500"
        onClick={() => {
          updateLocationData({
            reminders: [...reminders, { message: mentionVal }],
          });

          setMentionVal("");
        }}
      >
        Add reminder
      </button>
      <div className="flex flex-col gap-3">
        {reminders &&
          reminders.map((reminder: any) => {
            return (
              <p className="bg-slate-100  rounded-lg p-2" id={reminder.message}>
                {reminder.message.split(" ").map((word: string) => {
                  if (word.match(/@\[[^\]]*\]\([^)]*\)/g)) {
                    return (
                      <span className=" text-blue-700 bold font-semibold">
                        {word.replace(
                          /@\[[^\]]*\]\([^)]*\)/g,
                          "@" + word.match(/(?<=\[).+?(?=\])/g)
                        ) + " "}
                      </span>
                    );
                  }
                  return word + " ";
                })}
              </p>
            );
          })}
      </div>
    </div>
  );
}

export default LocationForm;

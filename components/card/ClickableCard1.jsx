import { Card } from "react-native-paper";
import { TouchableOpacity , View} from "react-native";
import Button from "../buttons/Button";
import { H5, H6, Span } from "../text";
import {
  spacing,
  typography,
  SCREEN_WIDTH,
  LIGHT,
  PRIMARY_COLOR,
  PRIMARY_COLOR_TRANSPARENT,
} from "../../styles";

export default function ClickableCard1({
  index,
  title,
  subtitle,
  leftContent,
  rightContent,
  children,
  isNegativeButtonVisible = false,
  negativeText,
  negativeAction,
  isPositiveButtonVisible = false,
  positiveText,
  positiveAction,
  onPress,
  onLongPressAction,
  isViewButtonVisible = false,
  viewText,
  viewAction,
  selected = false,
  borderColor = "transparent",
}) {
  return (
    <TouchableOpacity
      style={[spacing.mv1, { width: SCREEN_WIDTH - 16 }]}
      onPress={onPress}
      onLongPress={() => onLongPressAction(index)}
    >
      <Card
        style={{
          backgroundColor: selected ? PRIMARY_COLOR_TRANSPARENT : LIGHT,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: borderColor,
        }}
      >
        <Card.Content>
          <View style={{ marginBottom: 8 }}>
            <H5
              style={{
                flexWrap: "wrap",
                flexShrink: 1,
                width: "80%", 
              }}
            >
              {title}
            </H5>
            {!!subtitle && (
              <Span
                style={[
                  typography.font12,
                  typography.fontLato,
                  { textTransform: "capitalize", marginTop: 2 },
                ]}
              >
                {subtitle}
              </Span>
            )}
          </View>

          {children}
        </Card.Content>

        <Card.Actions>
          {isNegativeButtonVisible && (
            <Button
              style={{
                width: 80,
                padding: 8,
                borderRadius: 8,
                backgroundColor: PRIMARY_COLOR,
              }}
              onPress={negativeAction}
            >
              <Span
                style={{ fontSize: 16, color: "white", textAlign: "center" }}
              >
                {negativeText}
              </Span>
            </Button>
          )}
          {isPositiveButtonVisible && (
            <Button
              style={{
                width: 80,
                padding: 8,
                borderRadius: 8,
                backgroundColor: PRIMARY_COLOR,
              }}
              onPress={positiveAction}
            >
              <Span
                style={{ fontSize: 16, color: "white", textAlign: "center" }}
              >
                {positiveText}
              </Span>
            </Button>
          )}

          {isViewButtonVisible && (
            <Button
              style={{
                width: 80,
                padding: 8,
                borderRadius: 8,
                backgroundColor: PRIMARY_COLOR,
              }}
              onPress={viewAction}
            >
              <Span
                style={{ fontSize: 16, color: "white", textAlign: "center" }}
              >
                {viewText}
              </Span>
            </Button>
          )}
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );
}

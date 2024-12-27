import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Card } from "react-native-paper";
import Button from "../buttons/Button";
import { H5, H6, P, Span } from "../text";
import { spacing, typography, SCREEN_WIDTH, LIGHT, PRIMARY_COLOR } from "../../styles";
import { useTranslation } from "react-i18next";

export default function ClickableCard1({
    title, subtitle, leftContent, rightContent, children,
    isNegativeButtonVisible = false,
    negativeText,
    negativeAction,
    isPositiveButtonVisible = false,
    positiveText,
    positiveAction,

}) {

    return (
        <Card
            style={[
                spacing.mv1,
                {
                    width: SCREEN_WIDTH - 16,
                    backgroundColor: LIGHT,
                    marginHorizontal: 8,
                },
            ]}
            onPress={() => handleViewDetails(item)}
        >
            <Card.Title
                title={<H5>{title}</H5>}
                subtitle={<Span style={[typography.font12, { textTransform: 'capitalize' }]}>{subtitle}</Span>}
                left={leftContent}
                right={() => <H6>{rightContent}</H6>}
            />
            <Card.Content>
                {children}
            </Card.Content>
            <Card.Actions>
                {
                    isNegativeButtonVisible && (
                        <Button
                            style={{
                                width: 80,
                                padding: 8,
                                borderRadius: 8,
                                backgroundColor: PRIMARY_COLOR,
                            }}
                            onPress={negativeAction}
                        >

                            <Span style={{ fontSize: 16, color: "white", textAlign: "center" }}>
                                {negativeText}
                            </Span>

                        </Button>
                    )
                }
                {
                    isPositiveButtonVisible && (
                        <Button
                            style={{
                                width: 80,
                                padding: 8,
                                borderRadius: 8,
                                backgroundColor: PRIMARY_COLOR,
                            }}
                            onPress={positiveAction}
                        >

                            <Span style={{ fontSize: 16, color: "white", textAlign: "center" }}>
                                {positiveText}
                            </Span>

                        </Button>
                    )
                }

            </Card.Actions>
        </Card>
    );
}
